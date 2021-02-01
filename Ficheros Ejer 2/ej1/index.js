window.addEventListener("load",iniciar,false);

function iniciar() {
    document.getElementById("insertar").addEventListener("click", insertar,false);
    document.getElementById("consultar").addEventListener("click", mostrar,false);
}

function insertar() {
    miXHR=new XMLHttpRequest();
    var titulo=document.getElementById("titulo").value;
    var autor=document.getElementById("autor").value;
    var editorial=document.getElementById("editorial").value;
    var ano_publi=document.getElementById("ano_publi").value;
    var precio=document.getElementById("precio").value;
    let str="titulo="+titulo+"&autor="+autor+"&editorial="+editorial+"&ano_publi="+ano_publi+"&precio="+precio;
    cargarAsync(str);
}

function mostrar() {
    miXHR=new XMLHttpRequest();
    var campo=document.getElementById("campo").value;
    var valor=document.getElementById("valor").value;
    let str="campo="+campo+"&valor="+valor;
    cargarAsync(str);
}

function cargarAsync(parametros) 
{ 
	if (miXHR) {	
        document.getElementById("indicador").innerHTML="<img src='ajax-loader.gif'/>";

        miXHR.open('POST', "funciones.php", true);
		
		miXHR.onreadystatechange = estadoPeticion;
	
		miXHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		miXHR.send(parametros);
	}
}

function estadoPeticion(){	
	if ( this.readyState==4 && this.status == 200 ){
        document.getElementById("indicador").innerHTML="";
		document.getElementById("resultados").innerHTML=this.responseText;
	}
}