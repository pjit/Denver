/**
 * Created with JetBrains WebStorm.
 * User: psingh
 * Date: 3/1/14
 * Time: 9:52 PM
 * To change this template use File | Settings | File Templates.
 */

//
//
//
function DENSprite(name, painter, behaviors) {
   if (name !== undefined) this.name = name;
   if (painter !== undefined) this.painter = painter;

   this.position = new DENVector();
   this.width = 10;
   this.height = 10;
   this.velocity = new DENVector();
   this.visible = true;
   this.animating = false;
   this.behaviours = behaviors || [];
}

//
//
//
DENSprite.prototype = {
   paint: function(context) {
      if (this.painter !== undefined && this.visible) {
         this.painter.paint(this, context);
      }
   },
   update: function(context, time) {
      for (var i = 0; i < this.behaviors.length; ++i) {
         this.behaviours[i].execute(this, context, time);
      }
   },
   setPosition: function(x, y) {
      this.position.x = x || this.position.x;
      this.position.y = y || this.position.y;
   }
};