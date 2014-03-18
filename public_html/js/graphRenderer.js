function graphRenderer()
{
    this.RGB = ['red', 'blue', 'green', 'orange', 'crimson', 'coral', 'greenyellow', 'fuchsia'];

   
}



graphRenderer.prototype.renderGraph = function(allData, labels) 
{    
            this.Data = allData;
            var ymax = 0;
            var ymin = 0;
            var time = new Array();;
            for (i = 1; i < allData.length; i++) 
            {
                time = (allData[0][i].getHours());
                for (j = 0; j < allData[i].length; j++) 
                {                    
                    if(ymax < allData[i][j] )
                    {
                        ymax = allData[i][j];
                    }
                    if(ymin > allData[i][j])
                    {
                        ymin = allData[i][j];
                    }
                }
            }
            ymin = Math.round(ymin - 1);
            ymax = Math.round(ymax + 1);   
            
            var lines = new Array(allData.length - 1);
            for (i = 1; i < allData.length; i++) 
            {                
                lines[i] = new RGraph.Line('adeiGraph', allData[i])
                            .Set('spline', true)
                            .Set('numxticks', 0)
                            .Set('numyticks', 0)
                            .Set('hmargin', 10)
                            .Set('background.grid.autofit.numvlines', 11)
                            .Set('colors', [this.RGB[i - 1]])
                            .Set('key', labels[i])    
                            .Set('linewidth', 2)
                            .Set('gutter.left', 40)
                            .Set('gutter.right', 15)
                            .Set('labels', time)
                            .Set('key.interactive', true)
                            //.Set('shadow',true)
                            //.Set('shadow.color','#aaa')
                            //.Set('shadow.blur',5)
                            .Set('resizable', true)
                            .Set('outofbounds', true)   
                            .Set('ymin', ymin)
                            .Set('ymax', ymax)
                            .Draw();
             }             
     
    
};


graphRenderer.prototype.onScrollEvent = function () 
{
    window.alert('scroll');
    
};
