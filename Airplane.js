const input=[ [3,2], [4,3], [2,3], [3,4] ]
let axileSeat=0
let windowSeat=0
let centerSeat =0
let total_row=0
let total_col=0
let output=[[]]
const seatInfo ={}

function calculateFirst (item)    //Function to calculate the which row belong belong to which group and what are there types
{
    if(item[0]>1)
    {
        axileSeat = axileSeat+item[1]
        // axilelist.push(item[0]-1)
        seatInfo[item[0]-1] ={
            type:0,
            belongsTo:0
        }
        centerSeat = centerSeat + item [1] * (item[0]-2)
        for(let i=1;i<item[0]-1;i++){
            // centerlist.push(i)
            seatInfo[i] ={
            type:2,
            belongsTo:0
        }
        }
     
    }
    total_row=Math.max(total_row,item[1])
    total_col+=item[0]
    windowSeat = windowSeat+item[1]
    seatInfo[0]={
        type:1,
        belongsTo:0
    }
    
}
function calculateLast(item)
{
    total_col+=item[0]
    if(item[0]>1)
    {
        axileSeat = axileSeat+item[1]
        // axilelist.push(total_col-item[0])
        seatInfo[total_col-item[0]] ={
            type:0,
            belongsTo:input.length-1
        }
        centerSeat = centerSeat + item [1] * (item[0]-2)
        for(let i = total_col-item[0]+1;i<total_col-1;i++)
        {
                // centerlist.push(i)
                seatInfo[i] ={
            type:2,
            belongsTo:input.length-1
        }
        }
    }
    total_row=Math.max(total_row,item[1])
    
    windowSeat = windowSeat+item[1]
    seatInfo[total_col-1]={
        type:1,
        belongsTo:input.length-1
    }
}
if(input.length>1)
{
    calculateFirst(input[0])
    let col = input[0][0]
    
    for(let i=1;i<input.length-1;i++)
    {
            total_row=Math.max(total_row,input[i][1])
             total_col+=input[i][0]
        if(input[i][0]>1)
        {
            axileSeat = axileSeat+input[i][1]
            // axilelist.push(input[i][0]+col-1)
            seatInfo[input[i][0]+col-1] ={
                    type:0,
                    belongsTo:i
                              }
            centerSeat = centerSeat + input[i][1] * (input[i][0]-2)
            for(let j=col+1;j<input[i][0]+col-1;j++)
            {
                // centerlist.push(j)
                
                    seatInfo[j] ={
                    type:2,
                    belongsTo:i
            }
            }
        }
        axileSeat = axileSeat+input[i][1]
        // axilelist.push(col)
        seatInfo[col] ={
                    type:0,
                    belongsTo:i
                              }
        col+=input[i][0]
    }
    calculateLast(input[input.length-1])

}
else 
{
        calculateFirst(input[0])

}

function determineSeatType(row,col)    // Function to determint individual seat type and assign the pessanger number to that seat
{
     
    let group = seatInfo[col].belongsTo
    if(row<input[group][1])
    {
        if(seatInfo[col].type==0)
        {
            output[row][col]=axileSeat
            axileSeat+=1
        }
        else if(seatInfo[col].type==1)
        {
            output[row][col]=windowSeat
            windowSeat+=1
        }
        else 
        {
            output[row][col]=centerSeat
            centerSeat+=1
        }
    }
   
       
    
}
centerSeat= axileSeat+windowSeat+1
windowSeat=axileSeat+1
axileSeat=1

for(let i=0;i<total_row;i++)
{
     output[i] = [];
    for(let j=0;j<total_col;j++)
    {
        output[i][j] = -1;
        determineSeatType(i,j)
        
    }
}

for (let i = 0; i < total_row; i++) {
    let rowString = "";
    for (let j = 0; j < total_col; j++) {
        rowString += output[i][j] + "\t";
    }
    console.log(rowString);
}

