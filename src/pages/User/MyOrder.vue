<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left blue"></div>
            </div>
          <div class="col">
            <q-banner inline-actions class="text-blue-grey-14">
              <div class="text-h6">Data Transaksi Hotel</div>
              <div>Data Transaksi Hotel Dan Pemesanan Anda</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
        <q-table
          title="Treats"
          :data="data"
          :columns="columns"
          row-key="name"
          flat
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="judulFilm" :props="props">
                {{ props.row.dataMovie[0].judulFilm }}
              </q-td>
              <q-td key="harga" :props="props">
                {{ props.row.harga }}
              </q-td>
              <q-td key="jumlah" :props="props">
                {{ props.row.jumlah }}
              </q-td>
              <q-td key="total" :props="props">
                {{ props.row.total }}
              </q-td>
              <q-td key="status" :props="props">
                <q-badge v-if="props.row.status === 1" color="warning" class="q-pa-sm">
                  Belum Dikonfirmasi
                </q-badge>
                <q-badge v-else-if="props.row.status === 2" color="blue" class="q-pa-sm">
                  Sedang Dalam Persiapan Kamar
                </q-badge>
                <q-badge v-else color="green" class="q-pa-sm">
                  Sudah selesai
                </q-badge>
              </q-td>
              <q-td key="aksi" :props="props">
                <q-btn :disabled="props.row.status !== 2" label="Sudah Selesai" @click="confirm(props.row._id)" color="green" class="q-ml-sm" unelevated/>
              </q-td>
            </q-tr>
          </template>
        </q-table>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      columns: [
        { name: 'judulFilm', align: 'center', label: 'Nama Hotel', field: 'judulFilm', sortable: true },
        { name: 'harga', align: 'center', label: 'Harga Hotel', field: 'harga', sortable: true },
        { name: 'jumlah', align: 'center', label: 'Pesan Kamar', field: 'jumlah', sortable: true },
        { name: 'total', align: 'center', label: 'Total', field: 'total', sortable: true },
        { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],

      data: [],
      activeData: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get(`order/getorderbyuser/${this.$q.localStorage.getItem('datauser')._id}`)
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
          }
        })
    },
    confirm (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Apakah anda menikmati layanan kami?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.put(`order/terimaorder/${id}`)
          .then((res) => {
            if (res.data.sukses) {
              this.$showNotif(res.data.pesan, 'positive')
              this.getData()
            } else {
              this.$showNotif(res.data.pesan, 'negative')
            }
          })
      })
    }
  }
}
</script>
<style scoped>
.left {
  width: 3px;
  height: 100%;
  background-color: rgb(3, 7, 63);
}
</style>
