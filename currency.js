Vue.component('datepicker', {
	template: `
	        <div ref="date" class="ui left action input">
	          <button class="ui icon button" data-toggle>
	            <i class="calendar icon"></i>
	          </button>
	          <input type="text" :name="name" :placeholder="placeholder" :readonly="readonly" @change="historyDate($event.target.value)" data-input/>
	          <button class="ui inverted icon button" :disabled="!value" data-clear>
	            <i class="remove red icon"></i>
	          </button>
	        </div>
	`,

	props: {
		name: String,
	    value: {
	      require: false
	    },
	    placeholder: String,
	    readonly: Boolean
	},

  date() {
    return {
      datepicker: null
    }
  },

  mounted() {
    if (!this.datepicker) {
      this.datepicker = flatpickr('.ui.input', {
      	dateFormat:'d-m-Y',
        wrap: true
      })
      // let lang = 'ko'
      // let locale = require(`flatpickr/dist/l10n/${lang}.js`)[lang]
      // this.datepicker = new Flatpickr(this.$refs.date, {
      //   wrap: true,
      //   locale
      // })
      
    }
  },

  destroyed() {
    this.datepicker.destroy()
    this.datepicker = null
   },

   methods:{

   	historyDate(event) {
		console.log(event);
   		this.$emit('input',event);
   		
   		axios.get('https://cors-anywhere.herokuapp.com/' + 'https://forex.cbm.gov.mm/api/history/' + event)
		.then(({data}) => da.latest = data.rates);
		console.log(da.latest);		
        //...
    }

   }

   

});


var da = new Vue({

	el: '#app',

	data: {

		latest: [],
		currencies: [],
		date:null

	},

	created() {

		axios.get('https://cors-anywhere.herokuapp.com/' + 'https://forex.cbm.gov.mm/api/latest')
		.then(({data}) => this.latest = data.rates);

		axios.get('https://cors-anywhere.herokuapp.com/' + 'https://forex.cbm.gov.mm/api/currencies')
		.then(({data}) => this.currencies = data.currencies);

	}
});