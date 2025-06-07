const supabaseUrl = 'https://rynfsckraunchdtxqfhu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5bmZzY2tyYXVuY2hkdHhxZmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMTM3MjcsImV4cCI6MjA2MTY4OTcyN30.3fT003TXrurai77kaX4TogPjyirMBQRuQPYfuaeyfWE'; // sua chave inteira aqui

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

async function validarInstancia() {
  const instancia = document.getElementById('instanciaInput').value.trim();
  const erroMsg = document.getElementById('erroMsg');

  if (!instancia) {
    erroMsg.textContent = 'Por favor, insira sua instância.';
    return;
  }

  const { data, error } = await supabaseClient
    .from('Capturas_google_maps')
    .select('cliente_solicitante')
    .eq('instancia_evo', instancia)
    .limit(1);

  if (error || data.length === 0) {
    erroMsg.textContent = 'Instância não encontrada.';
    return;
  }

  const empresa = data[0].cliente_solicitante;

  // Salva no localStorage para usar no dashboard
  localStorage.setItem('empresaSelecionada', empresa);
  localStorage.setItem('instanciaSelecionada', instancia);

  // Redireciona ao dashboard
  window.location.href = 'dashboard.html';
}
