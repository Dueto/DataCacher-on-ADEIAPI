(function(window)
{   
    var dataHandler = function()
    { 
        var me = {};  
        
        me.dateHelper = new dateTimeFormat();
        
        me.dataLevel = [{level: 'Year', aggregator: '-01-01T00:00:00.000000', window: 31536000},
                        {level: 'Month', aggregator: '-01T00:00:00.000000', window: 2592000},
                        {level: 'Day', aggregator: 'T00:00:00.000000', window: 86400},                        
                        {level: 'Hour', aggregator: ':00:00.000000', window: 3600},                         
                        {level: 'Min', aggregator: ':00.000000', window: 60},      
                        {level: 'Sec', aggregator: '.000000', window: 1},
                        {level: 'Milisec', aggregator: '', window: 0}];
        
        me.parseData = function(csv)
        {
            var numrows = csv.numrows;            
            var numcols = csv.numcols;            
            var labels = csv.getRow(0)[1];   
            var allData = new Array(numcols);

            for (i = 0; i < numcols; i++) 
            {
                allData[i] = new Array(numrows -1);
                var row = csv.getCol(i,1);

                for (j = 0; j < numrows - 1; j++) 
                {           
                    if (i === 0) 
                    {      
                        var Milliseconds = row[j].substr(22);
                        allData[i][j] = this.dateHelper.splitTimeFromAny(row[j]);
                    }
                    else
                    {
                        allData[i][j] = parseFloat(row[j]);
                    }

                }
            }
            
            return {data: allData[1], dateTime: allData[0], label: labels};
        };
        
        me.concatRowData = function(res, dataBuffer, dateTime)
        {                                   
            for (k = 0; k < res.rows.length; k++) 
            {                                      
                dataBuffer.push(res.rows.item(k).PointData);   
                dateTime.push(res.rows.item(k).DateTime);                                       
            } 
        };
        
         me.getDataLevel = function(pointCount, window)
         {   
            var diffrence = window.split('-')[1] - window.split('-')[0];
            var multiplier = diffrence/pointCount;            
            if(multiplier < 31536000)
            {
                if(multiplier < 2592000)
                {
                    if(multiplier < 86400)
                    {
                        if(multiplier < 3600)
                        {
                            if(multiplier < 60)
                            {
                                if(multiplier < 1)
                                {
                                    return this.dataLevel[6];
                                }
                                else
                                {
                                    return this.dataLevel[5];
                                }
                            }
                            else
                            {
                                return this.dataLevel[4];
                            }
                        }
                        else
                        {
                            return this.dataLevel[3];
                        }
                    }
                    else
                    {
                        return this.dataLevel[2];
                    }
                }
                else 
                {
                    return this.dataLevel[1];
                }

            }
            else
            {
                return this.dataLevel[0];
            }

            
        };
        
        me.formatUnixData = function(dateTime, aggregator, dataLevel)
        {
            if(dataLevel == 'Year')
            {
                return dateTime.substring(0,4) + aggregator;
            }
            if(dataLevel == 'Month')
            {
                return dateTime.substring(0,7) + aggregator;
            }
            if(dataLevel == 'Day')
            {
                return dateTime.substring(0,10) + aggregator;
            }
            if(dataLevel == 'Hour')
            {
                return dateTime.substring(0,13) + aggregator;
            }
            if(dataLevel == 'Min')
            {
                return dateTime.substring(0,16) + aggregator;
            }
            if(dataLevel == 'Sec')
            {
                return dateTime.substring(0,19) + aggregator;
            }
            if(dataLevel == 'Milisec')
            {
                return dateTime;
            }
        };
        
        return me;
            
    }; 
    
    window.dataHandler = dataHandler;
    

})(window);




