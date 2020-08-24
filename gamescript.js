var mode="hard";
var n;
var colors;
var tiles2=document.querySelector("#tiles2")
var header=document.querySelector("#heading");
var buttons=document.querySelectorAll("button");
var message=document.querySelector("#message");
var display_value=document.querySelector("#color");
var tiles=document.querySelectorAll(".square");
var reset=document.querySelector("#reset");
var selected_colour;
var background_colour="steelblue";
function resetGame()
{
    header.style.background="steelblue";
    reset.innerHTML="NEW GAME";
    buttons.forEach(function(button){
        button.style.color="steelblue";
        button.addEventListener("mouseenter",function(){
            this.style.background="steelblue";
            this.style.color="white";
        });
        button.addEventListener("mouseleave",function(){
            this.style.color="steelblue";
            this.style.background="white";
        });        
    });
    generateColours(mode);
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

reset.addEventListener("click",resetGame);
function generateColours(mode)
{
    if(mode=="easy")
    {
        n=5;
        tiles2.style.display="none";
    }
    else
    {
        n=10;
        tiles2.style.display="flex";
    }
    colors=[];
    for(var i=0; i<n; i++)
    {
        var r,g,b;
        r=getRandomInt(256);
        g=getRandomInt(256);
        b=getRandomInt(256);
        var c="rgb("+r+", "+g+", "+b+")";
        colors.unshift(c);
    }
    selected_colour=colors[getRandomInt(n)];
    display_value.innerHTML=selected_colour;
    colors.forEach(function(color,index)
    {
        tiles[index].style.background=color;
    });

}
function correctColorChosen()
{
    header.style.background=selected_colour;
    background_colour=selected_colour;
    tiles.forEach(function(tile){
        tile.style.background=selected_colour;
    });
    buttons.forEach(function(button){
        button.style.color=selected_colour;
        button.addEventListener("mouseenter",function(){
            this.style.background=selected_colour;
            this.style.color="white";
        });
        button.addEventListener("mouseleave",function(){
            this.style.color=selected_colour;
            this.style.background="white";
        });
    });
    message.innerHTML="Yes, that's right!!";
    reset.innerHTML="TRY AGAIN?"
    for(var i=0; i<n; i++)
    {
        if(tiles[i].style.background!=selected_colour)
        tiles[i].style.background="black";
    }

}
generateColours(mode);
tiles.forEach(function(tile){
    tile.addEventListener("click",function(){
        if(this.style.background==selected_colour)
        correctColorChosen();
        else
        {
            if(this.style.background!="black")
            {
                message.innerHTML="Try Again!";
                this.style.background="black";
            }
        }
    });
});
buttons[1].addEventListener("click",function(){
    mode="easy";
    resetGame(mode);
});
buttons[2].addEventListener("click",function(){
    mode="hard";
    resetGame(mode);
});
