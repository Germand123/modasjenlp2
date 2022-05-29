<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
Use App\Models\Producto;
Use Log;

class ProductoController extends Controller
{
    public function getAll(){
        $data = Producto::get();
        return response()->json($data, 200);
      }
  
      public function create(Request $request){
        $data['nombre'] = $request['nombre'];
        $data['modelo'] = $request['modelo'];
        $data['descripcion'] = $request['descripcion'];
        $data['precio'] = $request['precio'];
        $data['categoria'] = $request['categoria'];
        $data['imagen'] = $request['imagen'];

        Producto::create($data);
        return response()->json([
            'message' => "Successfully created",
            'success' => true
        ], 200);
      }
  
      public function delete($id){
        $res = Producto::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
      }
  
      public function get($id){
        $data = Producto::find($id);
        return response()->json($data, 200);
      }
  
      public function update(Request $request,$id){
        $data['nombre'] = $request['nombre'];
        $data['modelo'] = $request['modelo'];
        $data['descripcion'] = $request['descripcion'];
        $data['imagen'] = $request['imagen'];
        $data['precio'] = $request['precio'];
        $data['categoria'] = $request['categoria'];
        Producto::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
      }
}