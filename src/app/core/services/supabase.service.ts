//import { Injectable } from '@angular/core';
//import { createClient, SupabaseClient } from '@supabase/supabase-js';

// 🔐 Llaves de Supabase
//const SUPABASE_URL = 'https://elrvgjymeubuhkkryyil.supabase.co';
//const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscnZnanltZXVidWhra3J5eWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MDU4NDcsImV4cCI6MjA3MDA4MTg0N30.tJHBiGzb_9u3H61fZ02yJq8IhdUaReTKe-fE0Qhs57U';

//@Injectable({
  //  providedIn: 'root',
//})
//export class SupabaseService {
//    public client: SupabaseClient; 

//    constructor() {
//        this.client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
//    }

  // ✅ Método auxiliar para insertar datos en una tabla
 //   async insertar<T>(tabla: string, datos: T) {
  //      const { data, error } = await this.client.from(tabla).insert([datos]);
   //     if (error) throw error;
   //     return data;
   // }

  // ✅ Obtener todos los datos de una tabla
  // async obtenerTodo(tabla: string) {
  //     const { data, error } = await this.client.from(tabla).select('*');
  //     if (error) throw error;
  //     return data;
  // }

  // ✅ Obtener por ID (si usas UUID u otro campo identificador)
  //  async obtenerPorId(tabla: string, id: string) {
  //      const { data, error } = await this.client
  //          .from(tabla)
  //          .select('*')
  //          .eq('id', id)
  //          .single();

  //          if (error) throw error;
  //          return data;
  //  }

  // ✅ Eliminar por ID
  //  async eliminarPorId(tabla: string, id: string) {
  //      const { error } = await this.client.from(tabla).delete().eq('id', id);
  //      if (error) throw error;
  //  }

  // ✅ Actualizar por ID
  //  async actualizarPorId<T>(tabla: string, id: string, datos: T) {
  //      const { data, error } = await this.client
  //      .from(tabla)
  //      .update(datos)
  //      .eq('id', id);

  //      if (error) throw error;
  //      return data;
  //  }
//}
