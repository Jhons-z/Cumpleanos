export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json();
  const { usuario, password } = body;

  // Consultar a la base de datos D1
  const { results } = await env.DB.prepare(
    "SELECT * FROM usuarios WHERE usuario = ? AND password = ?"
  ).bind(usuario, password).all();

  if (results.length > 0) {
    // Usuario válido
    return new Response(JSON.stringify({ success: true, token: "autorizado" }), { 
      status: 200, headers: { "Content-Type": "application/json" } 
    });
  } else {
    // Credenciales incorrectas
    return new Response(JSON.stringify({ success: false, message: "Credenciales inválidas" }), { 
      status: 401, headers: { "Content-Type": "application/json" } 
    });
  }
}