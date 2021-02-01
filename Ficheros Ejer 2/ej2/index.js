window.addEventListener("load",iniciar,false);

function iniciar() {
    document.getElementById("consultar").addEventListener("click", mostrar,false);
}

function mostrar() {
    miXHR=new XMLHttpRequest();
    cargarAsync();
}

function cargarAsync() 
{ 
	if (miXHR) {	
        document.getElementById("indicador").innerHTML="<img src='ajax-loader.gif'/>";

        miXHR.open('GET', "catalogo.xml", true);
		
		miXHR.onreadystatechange = estadoPeticion;
	
		miXHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		miXHR.send();
	}
}

function estadoPeticion(){	
	if ( this.readyState==4 && this.status == 200 ){
        var docXml=this.responseXML;
        var peliculas=docXml.getElementsByTagName("PELICULA");
        var pelisSelect=[];
        var campo=document.getElementById("campo").value;
        var valor=document.getElementById("valor").value;
        for (let i = 0; i < peliculas.length; i++) {
            if (valor=="") {
                pelisSelect.push(peliculas[i]);
            }else{
                if (peliculas[i].getElementsByTagName(campo.toUpperCase())[0].textContent==valor) {
                    pelisSelect.push(peliculas[i]);
                }
            }
        }
        console.log(pelisSelect)
        var camposMostrar=document.getElementsByName("datosMostrar");
        var camposSeleccionados=[];
        for (let i = 0; i < camposMostrar.length; i++) {
            if (camposMostrar[i].checked) {
                camposSeleccionados.push(camposMostrar[i].value)
            }
        }
        console.log(camposSeleccionados);
        var tabla="<table>";
        tabla+="<tr>";
        for (let j = 0; j < camposSeleccionados.length; j++) {
            tabla+="<th>"+camposSeleccionados[j]+"</th>";
        }
        tabla+="</tr>";
        for (let i = 0; i < pelisSelect.length; i++) {
            tabla+="<tr>";
            for (let j = 0; j < camposSeleccionados.length; j++) {
                tabla+="<td>"+pelisSelect[i].getElementsByTagName(camposSeleccionados[j].toUpperCase())[0].textContent+"</td>";
            }
            tabla+="</tr>";
        }
        tabla+="</table>";
        document.getElementById("resultados").innerHTML=tabla;
        document.getElementById("indicador").innerHTML="";
		
	}
}      