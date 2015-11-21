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
    
    
    // helpers
    
    function num(number) {
        return Number(number);
    }
    
    function r(number) {
        return Math.round(Number(number));
    }
    
    // produce soda 
    function factory(rate) {
       l.p_rate = num(l.p_rate) + rate;
    }
        
    // sell soda
    function seller(rate) {
        l.s_rate = num(l.s_rate) + rate;
    }
        
    // increase price through "Public Relations and Marketing"
    function price(amount) {
        l.price = num(l.price) + amount;
    }
    
    // initialise
    function init() {
        if (l.money === undefined || l.soda === undefined 
        || l.price === undefined || l.s_rate === undefined 
        || l.p_rate === undefined) {
            l.money = 0;
            l.soda = 0;
            l.price = 30;
            l.s_rate = 0;
            l.p_rate = 0;
        } 
        
        $money.html(l.money);
        $soda.html(l.soda);
        $price.html(l.price/10);
        
        loop();
    }
    
    // reset
    function reset() {
        l.p_rate = 0;
        l.s_rate = 0;
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
            l.soda = num(l.soda) + 1;
            reload();
        } else if ($what === "money") {
            if (l.soda >= 1) {
                l.soda = num(l.soda) - 1;
                l.money = r(l.money + l.price/10);
                reload();
            } else {
                alert("You haven't got enough soda! Go get some first!")
            }
        } else {}
    }
    
    function loop() {
        setInterval(function() {
            if (num(l.p_rate) !== 0) {
                l.soda = num(l.soda) + r(l.p_rate/5);
                reload();
            }    
            if (num(l.s_rate) !== 0 && num(l.soda) >= r(l.s_rate/5)) {
                l.money = r(l.money + (num(l.s_rate) * l.price/10));
                l.soda = num(l.soda) - r(l.s_rate);
                reload();
            }
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
