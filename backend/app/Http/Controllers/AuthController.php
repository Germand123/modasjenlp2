<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;

use Illuminate\Support\Facades\Validator;




class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'newRegistro']]);
    }

    /**
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);

        // // antes
        // $credentials = $request->only('correo', 'password');
        // if ($token = $this->guard()->attempt($credentials)) {
        //     return $this->respondWithToken($token);
        // }
        // return response()->json(['error' => 'Unauthorized'], 401);
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        // $this->guard()->logout();
        // return response()->json(['message' => 'Successfully logged out']);
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        // return $this->respondWithToken($this->guard()->refresh());
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }

    public function newRegistro(Request $request){
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|between:2,100',
            'apellido' => 'required|string|between:2,100',
            'email'   => 'required|string|email|max:100|unique:users',
            'password'  => 'required|string|min:8',
            // 'confirmPassword'  => 'required|string|min:8'
        ]);

        if ($validator->fails()) {
                return response()->json($validator->errors()->toJson(),400);
        }

        $user = User::create(array_merge(
            $validator->validate(), 
             ['password' => bcrypt($request->password)]
        ));

        return response()->json([
            'message' =>'usuario registrado exitosamente!',
            'user' => $user
        ],201);

    }


    // public function buscaCorreo($correo){
    //     $user = User::where('correo', $correo);
    //     return response()->json([
    //         'message' =>'usuario en db exitosamente!',
    //         'user' => $user
    //     ],201);

    // }




    // public function buscaCorreo(Request $datos){
    //     $correo['correo'] = $datos['correo'];
    //     $data = User::select('correo')->where('correo',$correo)->get(); 
    //     return response()->json($data, 200);
    //   }









}
