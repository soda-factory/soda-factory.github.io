// Application
(function ($) {
    "use strict";
    
    var $money = $("#money"),
        $soda = $("#soda"),
        $price = $("#price"),
        $gen = $(".gen svg"),
        $reset = $("#reset"),
        l = localStorage;
        
        
    // TODO define factories and seller
    // factories 
    var f = {
        
    },
    
    // sellers
    s = {
       
    };
    
    
    
    // produce soda 
    function factory(rate) {
       l.p_rate = Number(l.p_rate) + rate;
    }
        
    // sell soda
    function seller(rate) {
        l.s_rate = Number(l.s_rate) + rate;
    }
        
    // increase price through "Public Relations and Marketing"
    function price(amount) {
        l.price = Number(l.price) + amount;
    }
    
    // initialise
    function init() {
        if (l.money === undefined || l.soda === undefined || l.price === undefined) {
            l.money = 0;
            l.soda = 0;
            l.price = 30;
        } 
        
        $money.html(l.money);
        $soda.html(l.soda);
        $price.html(l.price/10);
    }
    
    // reset
    function reset() {
        l.money = 0;
        l.soda = 0;
        l.price = 30;
        reload();
    }
    
    // generate soda / money from soda
    function generator(e) {
        var $this = $(e.target).closest(".gen"),
            $what = $this.attr("what");
        
        
        
        if ($what === "soda") {
            l.soda = Number(l.soda) + 1;
            reload();
        } else if ($what === "money") {
            if (l.soda >= 1) {
                l.soda = Number(l.soda) - 1;
                l.money = Math.round(Number(l.money) + l.price/10);
                reload();
            } else {
                alert("You haven't got enough soda! Go get some first!")
            }
        } else {}
    }
    
    function loop() {
        setInterval(function() {
            
        }, 200);
    }
    
    // update values
    function reload() {
        $money.html(l.money);
        $soda.html(l.soda);
        $price.html(l.price/10);
    }
    
    $(document).ready(function() {
       init();
       $gen.on("click", generator);
       $reset.on("click", reset);
       
    });
    
    
    
})( jQuery );
