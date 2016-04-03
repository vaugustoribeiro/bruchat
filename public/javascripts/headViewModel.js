function headViewModel() {
    var self = this;
    
    self.online = ko.observable();
    
    self.titulo = ko.observable();
    
    var data = new Date();
    data.setHours(0);
    data.setMinutes(0);
    data.setSeconds(0);
    
    self.tempoOnline = ko.observable(data);
    
    self.tempoOnlineFormatado = ko.computed(function() {
        return  normalizarHora(self.tempoOnline().getHours()) + ':' +
                normalizarHora(self.tempoOnline().getMinutes()) + ':' +
                normalizarHora(self.tempoOnline().getSeconds());                  
    }, self);
    
    function normalizarHora(numero) {
        return numero < 10 ? '0' + numero : numero;
    }
    
    setInterval(function() {
        if(self.online()) {
            data.setSeconds(self.tempoOnline().getSeconds() + 1);
            self.tempoOnline(data);
        }
    }, 1000);
};