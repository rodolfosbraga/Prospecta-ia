const supabaseUrl = 'https://rynfsckraunchdtxqfhu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5bmZzY2tyYXVuY2hkdHhxZmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMTM3MjcsImV4cCI6MjA2MTY4OTcyN30.3fT003TXrurai77kaX4TogPjyirMBQRuQPYfuaeyfWE'; // sua chave inteira aqui

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
// Defina aqui a empresa cujo dashboard será exibido:
const empresaSelecionada = localStorage.getItem('empresaSelecionada');
const instanciaSelecionada = localStorage.getItem('instanciaSelecionada');

if (!empresaSelecionada || !instanciaSelecionada) {
  window.location.href = 'login.html';
}

async function carregarLeads() {
  const { data, error } = await supabaseClient
    .from('Capturas_google_maps')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao carregar dados:', error);
    return;
  }

  // 🔍 FILTRA SOMENTE OS LEADS DA EMPRESA ATUAL
  const dadosFiltrados = data.filter(
  lead =>
    lead.cliente_solicitante === empresaSelecionada &&
    lead.instancia_evo === instanciaSelecionada
  );

  const tbody = document.querySelector('#leads-table tbody');
  const empresaValue = document.getElementById('empresa-value');
  const qtdValue = document.getElementById('qtd-leads-value');
  const mensagensTbody = document.querySelector('#messages-table tbody');

  tbody.innerHTML = '';
  mensagensTbody.innerHTML = `<tr><td colspan="3">Selecione um lead para ver detalhes</td></tr>`;

  dadosFiltrados.forEach((lead) => {
    const tr = document.createElement('tr');
    tr.dataset.classificacao = lead.rating || '—';
    tr.dataset.telefone = lead.telefone || '—';

    tr.innerHTML = `
      <td>${lead.nome_da_empresa}</td>
      <td>${lead.telefone}</td>
      <td>${lead.endereco}</td>
      <td>${lead.webite}</td>
      <td>${lead.reviews}</td>
      <td>${lead.especialidades}</td>
      <td>${lead.disparo}</td>
      <td>${lead.delay}</td>
    `;

    tr.addEventListener('click', () => {
      document.getElementById('detail-telefone').innerText = lead.telefone || '—';
      document.getElementById('detail-classificacao').innerText = lead.rating || '—';

      mensagensTbody.innerHTML = `
        <tr>
          <td>${lead.data_envio || '—'}</td>
          <td>${lead.mensagem_robo || '—'}</td>
          <td>—</td>
        </tr>
      `;
    });

    tbody.appendChild(tr);
  });

  // Atualiza os blocos de contagem e nome da empresa
  empresaValue.innerText = empresaSelecionada;
  qtdValue.innerText = dadosFiltrados.length;
}

window.addEventListener('DOMContentLoaded', carregarLeads);
