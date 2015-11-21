
// animate html
(function($) {
   "use strict"; 
   
    var gens = function() {
        var $gen = $(".gen svg");
        
        function shadow() {
            var $this = $(this);
            $this.on("mousedown", function() {
                $this.css({"box-shadow": "2px 2px 10px .1rem rgba(0,0,0,.7) inset"});
            });
            $this.on("mouseup", function() {
               $this.css({"box-shadow": "none"}); 
            });
        }
        
        $gen.on("click", shadow);
        
    };
    var shop = function() {
        var $item = $(".item"),
            $buy = $(".buy-button");
        
        function showDescription() {
            var $this = $(this),
               offset = $this.offset.top;
            $this.toggleClass("d");
            $this.siblings().removeClass("d");
            $this.css({"top": "-" + offset + "px"});
        }
        
        function shadow() {
            var $this = $(this);
            $this.on("mousedown", function() {
                $this.css({"box-shadow": "2px 2px 10px .1rem rgba(0,0,0,.2) inset"});
            });
            $this.on("mouseup", function() {
               $this.css({"box-shadow": "none"}); 
            });
        }
    
        $item.on("click", showDescription);
        $buy.on("click", shadow);
   };
   
   $(document).ready(function() {
      gens();
      shop();
   });
   
})( jQuery );
