// Supabase config
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://rynfsckraunchdtxqfhu.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

async function carregarLeads() {
  const { data, error } = await supabaseClient
    .from('Capturas_google_maps')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao carregar dados:', error);
    return;
  }

  const tbody = document.querySelector('#leads-table tbody');
  const empresaValue = document.getElementById('empresa-value');
  const qtdValue = document.getElementById('qtd-leads-value');
  tbody.innerHTML = '';

  data.forEach((lead) => {
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
      <td>${lead.data_envio}</td>
      <td>${lead.delay}</td>
    `;

    tr.addEventListener('click', () => {
      document.getElementById('detail-telefone').innerText = lead.telefone || '—';
      document.getElementById('detail-classificacao').innerText = lead.rating || '—';
    });

    tbody.appendChild(tr);
  });

  empresaValue.innerText = data[0]?.cliente_solicitante || '—';
  qtdValue.innerText = data.length;
}

window.addEventListener('DOMContentLoaded', carregarLeads);
