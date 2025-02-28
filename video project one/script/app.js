const app = Vue.createApp({
    data(){
        return {
            state:true,
            inputName:'',
            names:[],
            error: '',
            showError: false,
            result : ''
        }
    },

    computed: {
        isReady(){
            return this.names.length > 1
        }
    },
    methods:{
        addNameToList(){
            const userName = this.inputName;
            if(this.validate(userName)){
                this.names.push(userName);  
                this.inputName = '';
                this.showError = false
                console.log(this.names)
            } else { 
                this.showError = true
            }
        },
        validate(value){
            this.error = '';
            if (value === ''){
                this.error = 'Please enter a name'
                return false
            }

            if (this.names.includes(value)){
                this.error = 'Name already exists'
                return false
            }   
            return true
    },
    removeName(index){
        this.names.splice(index, 1) 
    },
    showResult(){
        this.generateResult()
        this.state = false
    },
    getRandomName(){
        return this.names[Math.floor(Math.random() * this.names.length)]
    },
    generateResult() {
        if (this.names.length === 0) {
            this.result = "Mulai Lagi?";
            return;
        }
    
        let randIndex = Math.floor(Math.random() * this.names.length);
        this.result = this.names[randIndex];
    
        // Hapus pemenang dari daftar
        this.names.splice(randIndex, 1);
    
        // Tambahkan animasi hanya ke nama pemenang
        this.$nextTick(() => {
            const resultText = document.querySelector(".result_value");
            if (resultText) {
                resultText.classList.remove("animate__fadeIn"); // Hapus animasi sebelumnya
                void resultText.offsetWidth; // Reset animasi agar bisa dimainkan ulang
                resultText.classList.add("animate__fadeIn"); // Tambahkan animasi
            }
        });
    },    
    resetApp(){
        this.state = true;
        this.inputName='';
        this. names=[];
        this.error= '';
        this.showError= false;
        this.result = ''
    },
    getNewResult(){
        this.generateResult();
}
    }
}).mount('#app');