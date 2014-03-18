function initDataCasher(id)

{      
   /* var url = formURL('autogen', 'hourly', 'default', 
                        '1211159859-1211241600', '', '', 
                        '', '', '', 
                        '', '', '');  
    var dataCach = new dataCacher();    
    dataCach.getData(url);*/
                        
    /*var csv = new RGraph.CSV(url, parseData);*/
    //var indexeddb = new IndexedDB();
    
    
    //indexeddb.deleteDataBase('DB');
    
    //indexeddb.openDataBase('logs');
   // indexeddb.addData({guid:"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", data:"calculation"},'logs');
   /* var DateTime = new Date('19-May-08 02:03:04.333111');
    var c = DateTime.toISOString();
    console.log(c);*/

   
}
var dataCach = new dataCacher();


function openDataBase() 
{
    var indexeddb = new IndexedDB();
    indexeddb.openDataBase('logs');     
}

function deleteDataBase() 
{
    var indexeddb = new IndexedDB();
    indexeddb.deleteDataBase('logs');    
}


function getData() 
{  
   //dataCach.insertData(1, '2008-05-19T00:03:04');
    
    
    var db_server = document.getElementById('db_server').value;
    var db_name = document.getElementById('db_name').value;
    var db_group = document.getElementById('db_group').value;
    var db_mask = document.getElementById('db_mask').value;
    var window = document.getElementById('db_window').value;    
    
    dataCach.getData(db_server,
                     db_name,
                     db_group,
                     db_mask,
                     window,                     
                     function(obj)
                     {
                        console.log(obj);
                     });
   
    
}


function formURL(db_server, db_name, db_group, db_mask, window)
{
    var url = 'http://localhost/adei-branch/adei/services/getdata.php?db_server=' + db_server 
            + '&db_name=' + db_name
            + '&db_group=' + db_group 
            + '&db_mask=' + db_mask 
            + '&window=' + window 
            + '&format=csv';
    return url; 
}


function parseData(csv)
{            
            var numrows = csv.numrows;            
            var numcols = csv.numcols;
            var labels = new Array(numcols);
            labels = csv.getRow(0);   
            var allData = new Array(numcols);
            
            for (i = 0; i < numcols; i++) 
            {
                allData[i] = new Array(numrows -1);
                var row = csv.getCol(i,1);
                
                for (j = 0; j < numrows - 1; j++) 
                {           
                    if (i === 0) 
                    {                        
                        var date = new Date(row[j]);
                        allData[i][j] = date;
                    }
                    else
                    {
                        allData[i][j] = parseFloat(row[j]);
                    }
                    
                }
            }
            console.log(allData);
            var graphRender = new graphRenderer();
            graphRender.renderGraph(allData, labels);
            
        
            
        
              
           
};

