const { Component, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useState } = owl.hooks;

/*
--------------------------------------------
Clase Promocion
Mostrar y canjear promoción
--------------------------------------------
*/
var state2 = {value:"mostrar"};
class Promocion extends Component {
	state = useState({value:"mostrar"});
	static template = xml`

	<div id="codigo" t-att-class="props.a">
		
		<h2>Canjea tu código</h2>
		<input type="text" name="text" placeholder="Canjea tu código"/>

		<p>Al hacer clic en Canjear, aceptas los Términos y condiciones de los Códigos Promocionales y las Tarjetas Regalo.</p>
		<div id="botones">
			<button t-on-click="volver">VOLVER</button>
			<button>CANJEAR</button>
		</div>
	</div>

	`;

	volver()
	{
		this.props.a = "noMostrar";
		this.render();
	}
}

/*
--------------------------------------------
Clase Calendar
Mostrar calendario
--------------------------------------------
*/
class Calendar extends Component {

	static template = xml`
	<div id="calendar">
		<div id="calendar_header"><i class="icon-chevron-left"></i>         
	 		<h1></h1><i class="icon-chevron-right"></i>     
	    </div>

		 	<div id="calendar_weekdays"></div>
		<div id="calendar_content"></div>
	</div>
	`;

}

/*
--------------------------------------------
Clase CodigoBoton
Te muestra los días disponibles y los que no de manera aleatoria
--------------------------------------------
*/
class CodigoBoton extends Component {

	state = useState({value:"noMostrar"});
	static template = xml`
	<div>
		<div id="codigoBoton">
	  		<p id="codigoPromo">Código promocional <a t-on-click="promocion" href="#">Haz clic aquí</a></p>
	  	    <button t-on-click="disponibilidad" id="boton">¡Consultar disponibilidad!</button>
	  	</div>
	  	<Promocion a="state.value" />
  	</div>`;

  	static components = { Promocion };

  	promocion() 
  	{
  		this.state.value = "mostrar";
  		this.render();
  	}

  	disponibilidad()
  	{
  		const dia = document.querySelector("#diaSelecionado");
  		var diasDisponibles = document.querySelectorAll(".diaDisponible");

  		if (dia == null) 
  		{
  			alert("Tienes que elegir un día");
  		}else {
  			for(var di of diasDisponibles)
  			{
  				var y = Math.random();
				if (y < 0.5)
				  y = 0;
				else
				  y= 1;
				
				if (y == 0 ) 
				{
					di.style.backgroundColor = "#F5B7B1";
				} else {
					di.style.backgroundColor = "#ABEBC6";
				}
				dia.removeAttribute('id');
  			}
  		}
  	}
}

/*
--------------------------------------------
Clase APP
--------------------------------------------
*/
class App extends Component {

	static template = xml`
	<div>
		<h1 id="titulo">Rerserva tu habitación</h1> 

		<Calendar />
		<CodigoBoton />

	  	<script type="text/javascript" src="appJS.js"></script>
  	</div>
	`;

	static components = { Calendar, CodigoBoton  };

}


function setup() {
	const app = new App();
	app.mount(document.body);
}

whenReady(setup);