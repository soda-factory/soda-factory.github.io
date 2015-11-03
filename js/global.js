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
        
        $this.mousedown(function(){$this.find("svg").css("box-shadow","2px 2px 10px .1rem rgba(0,0,0,.7) inset");});
        $this.mouseup(function(){$this.find("svg").css("box-shadow","none");});
        
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

// animate html
(function($) {
   "use strict"; 
   
   
   var shop = function() {
       var $item = $(".item");
       
       function showDescription() {
           var $this = $(this),
               offset = $this.offset.top;
           $this.toggleClass("d");
           $this.siblings().removeClass("d");
           $this.css({"top": "-" + offset + "px"});
       }
       
       $item.on("click", showDescription);
   };
   
   $(document).ready(function() {
      shop();
   });
   
})( jQuery );

// pubsub (kommunikation zwischen modulen)
var ps = {
  events: {},
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
  }
};