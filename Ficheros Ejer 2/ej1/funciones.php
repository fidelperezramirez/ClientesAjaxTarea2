<?php
    if (isset($_POST['precio'])) {
        $titulo=$_POST['titulo'];
        $autor=$_POST['autor'];
        $editorial=$_POST['titulo'];
        $ano_publi=$_POST['ano_publi'];
        $precio=$_POST['precio'];

        $con = mysqli_connect("localhost", "ajax", "dwec" , "ajax", 3307); 
        $sql="INSERT INTO libros (titulo, autor, editorial, ano_publi, precio) VALUES ('$titulo','$autor','$editorial','$ano_publi','$precio')";
        if (mysqli_query($con, $sql)) {
            echo "FIla insertada\n";
        }

    }
    
    if (isset($_POST['campo'])) {
        $campo=$_POST['campo'];
        $valor=$_POST['valor'];
        $con = mysqli_connect("localhost", "ajax", "dwec" , "ajax", 3307); 
        $sql="SELECT * FROM libros WHERE $campo LIKE '%$valor%'";
        $result=mysqli_query($con, $sql);
        $arr=array();
        if ($result) {
            for ($i=0; $i < 5; $i++) { 
                array_push($arr, mysqli_fetch_assoc($result));
                mysqli_next_result($con);
            }

            echo "<table border=1>";
            echo "<tr>";
            echo "<th>ID</th><th>Titulo</th><th>Autor</th><th>Editorial</th><th>Año Publicacion</th><th>Precio</th>";
            echo "</tr>";
            for ($i=0; $i < count($arr); $i++) { 
                if ($arr[$i]!=null) {
                    echo "<tr>";
                    foreach ($arr[$i] as $value) {
                        echo "<td>".$value."</td>";
                    }
                    echo "</tr>";
                }
                
            }
            echo "</table>";
            
        }
        
    }
?>