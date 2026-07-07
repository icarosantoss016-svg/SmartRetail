<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-secondary fw-bold m-0">Visão Geral do Sistema</h2>
      <div
        v-if="estaCarregando && !dadosDashboard.totalScans"
        class="spinner-border spinner-border-sm text-primary"
        role="status"
      ></div>
    </div>
    <hr />
    <div v-if="erro" class="alert alert-danger shadow-sm mb-4" role="alert">
      {{ erro }}
    </div>

    <div class="row mb-5">
      <div class="col-md-4 mb-3">
        <div class="card text-center bg-primary text-white h-100 shadow-sm border-0">
          <div class="card-body d-flex flex-column justify-content-center">
            <h5 class="card-title">Total de Scans</h5>
            <p class="display-4 fw-bold mb-0">
              {{ dadosDashboard.totalScans || 0 }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card text-center bg-success text-white h-100 shadow-sm border-0">
          <div class="card-body d-flex flex-column justify-content-center">
            <h5 class="card-title">Tempo Médio de Ativação</h5>
            <p class="display-5 fw-bold mb-0">
              {{ dadosDashboard.tempoMedioAtivacao || '0m 0s' }}
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-3">
        <div class="card h-100 shadow-sm border-0">
          <div class="card-header bg-dark text-white fw-bold">Top 5 Produtos</div>
          <div class="card-body p-0">
            <ul class="list-group list-group-flush">
              <li
                v-for="(item, index) in (dadosDashboard.ranking || []).slice(0, 5)"
                :key="index"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                {{ item.produtoNome }}
                <span class="badge bg-primary rounded-pill">{{ item.quantidade }} scans</span>
              </li>
              <li
                v-if="!dadosDashboard.ranking || dadosDashboard.ranking.length === 0"
                class="list-group-item text-center text-muted"
              >
                Nenhum dado disponível.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 mb-4">
        <div class="card shadow-sm border-0 h-100">
          <div class="card-header bg-dark text-white fw-bold">Tempo de Atividade</div>
          <div class="card-body">
            <div style="position: relative; height: 300px; width: 100%">
              <canvas ref="chartCanvas"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6 mb-4">
        <div class="card shadow-sm border-0 h-100">
          <div class="card-header bg-dark text-white fw-bold">
            Histórico Recente
          </div>
          <div class="card-body p-0 table-responsive">
            <table class="table table-hover table-striped mb-0">
              <thead class="table-light">
                <tr>
                  <th>ID</th>
                  <th>Produto</th>
                  <th>Duração</th>
                  <th>Data / Hora</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="log in (dadosDashboard.historico || []).slice(0, 10)"
                  :key="log.id"
                >
                  <td>#{{ log.id }}</td>
                  <td>{{ log.produtoNome }}</td>
                  <td>
                    <span class="badge bg-success">{{ log.duracao }}</span>
                  </td>
                  <td>{{ new Date(log.entrada).toLocaleString('pt-BR') }}</td>
                </tr>
                <tr
                  v-if="!dadosDashboard.historico || dadosDashboard.historico.length === 0"
                >
                  <td colspan="4" class="text-center text-muted py-3">Nenhum histórico recente.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue' 
import { useStore } from 'vuex'
import Chart from 'chart.js/auto' 

const store = useStore()

const chartCanvas = ref(null)
let chartInstance = null
let intervaloId = null

const dadosDashboard = computed(() => store.getters['dashboard/dadosDashboard'])
const estaCarregando = computed(() => store.getters['dashboard/estaCarregando'])
const erro = computed(() => store.getters['dashboard/erro']) 

function atualizarMetricas() {
  store.dispatch('dashboard/fetchMetricas')
}

onMounted(() => {
  atualizarMetricas()
  intervaloId = setInterval(atualizarMetricas, 3000) 
})

onUnmounted(() => {
  if (intervaloId) {
    clearInterval(intervaloId)
  }
  if (chartInstance) {
    chartInstance.destroy()
  }
})

watch(() => dadosDashboard.value.historico, (novoHistorico) => {
  if (!novoHistorico || novoHistorico.length === 0) {
    return
  }

  const ultimosLogs = [...novoHistorico].slice(0, 15).reverse()

  const labels = ultimosLogs.map(log => new Date(log.entrada).toLocaleTimeString('pt-BR'))
  const data = ultimosLogs.map(log => parseFloat(log.duracao || 0))

  if (chartInstance) {
    chartInstance.data.labels = labels
    chartInstance.data.datasets[0].data = data
    chartInstance.update()
  } else {
    const ctx = chartCanvas.value.getContext('2d')
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Duração (segundos)',
          data: data,
          borderColor: '#198754',
          backgroundColor: 'rgba(25, 135, 84, 0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    })
  }
}, { deep: true })
</script>

