import React from "react";
import "./App.css";
import Boton from "./componentes/Boton";
import { Window } from "./componentes/Window";
import { Logo } from "./componentes/Logo";
import { useState, useEffect } from "react";
import { evaluate, pow } from "mathjs";

function App() {
  const [input, setInput] = useState(0);
  const [resultado, setResultado] = useState(0);
  const [valores, setValores] = useState([0, 0]);
  const [operador, setOperador] = useState("");

  //useEfect
  useEffect(() => {
    if (resultado.toString().includes("=")) {
      setResultado("0");
      setValores([input, 0]);
      return;
    }
    setResultado(valores[0] + operador);
  }, [operador]);

  //ACuando se presiona algun operador
  const agregarOperador = (valor) => {
    if (valor === "%" || valor === "X²" || valor === "±" || valor === "⌫") {
      if (input.toString() !== "0" && valor === "%") {
        setResultado(input.toString().replaceAll(",", "") + "%");
        setInput(evaluate(input.toString().replaceAll(",", "") + "%"));
        setValores([
          evaluate(input.toString().replaceAll(",", "") + "%"),
          valores[1],
        ]);
      } else if (input.toString() !== "0" && valor === "X²") {
        setResultado(pow(input.toString().replaceAll(",", ""), 2) + "²");
        setInput(pow(input.toString().replaceAll(",", ""), 2));
        setValores([pow(input.toString().replaceAll(",", ""), 2), valores[1]]);
      } else if (input.toString() !== "0" && valor === "±") {
        let numero = input.toString().includes("-")
          ? input.toString().replace("-", "")
          : "-" + input;
        setInput(numero);
        setValores([numero.toString().replaceAll(",", ""), valores[1]]);
      } else if (
        input.toString() !== "0" &&
        input.toString().length > 0 &&
        valor === "⌫"
      ) {
        //Esto pasara cuando trate de borrar un numero en pantalla
        if (input.toString().length === 1) {
          setInput(0);
          setValores([0, valores[1]]);
        } else {
          setInput(input.toString().substring(0, input.toString().length - 1));
          if (!operador) {
            setValores([
              input.toString().substring(0, input.toString().length - 1),
              valores[1],
            ]);
          } else {
            setValores([
              valores[0],
              input.toString().substring(0, input.toString().length - 1)
            ]);
          }
        }
      }
      return;
    }
    if (resultado.toString().includes("=")) {
      setResultado(input.replace(/,/g, "") + operador);
      setValores([input.replace(/,/g, ""), valores[1]]);
    }
    if (!operador) {
      // si no hay operador matematico
      if (input) {
        setValores([valores[0], input]);
      }
    }
    setOperador(valor); //se ejecutara solo si ya existe un operador matematico para actualizarlo
    setInput(0);
  };

  //al presionar un numero
  const agregarInput = (valor) => {
    if (input.toString().length > 17) {
      return;
    }
    if (resultado.toString().includes("=")) {
      setInput(valor);
      setValores([valor, 0]);
      setOperador("");
      return;
    }
    if (input.toString() === "0") {
      if (valor === ".") {
        setInput(0 + valor);
      } else {
        if (!operador) {
          //si es primer operando que se escribe
          setValores([valor, valores[1]]);
        } else {
          //si es el segundo operando
          setValores([valores[0], valor]);
        }
        setInput(valor);
      }
    }
    if (input.toString() !== "0") {
      if (input.toString().includes(".")) {
        if (valor !== ".") {
          if (!operador) {
            //si es primer operando que se escribe
            setValores([input + valor, valores[1]]);
          } else {
            //si es el segundo operando
            setValores([valores[0], input + valor]);
          }
          setInput(input + valor);
        } else {
          return;
        }
      } else {
        //si no contiene el punto decimal
        if (!operador) {
          //si es primer operando que se escribe
          setValores([input + valor, valores[1]]);
        } else {
          //si es el segundo operando
          setValores([valores[0], input + valor]);
        }
        setInput(input + valor);
      }
    }
  };

  const calcularResultado = () => {
    if (operador) {
      setResultado(valores[0] + operador + valores[1] + "="); //solamente mostramos la operacion que se realizara
      setValores([evaluate(valores[0] + operador + valores[1]), valores[1]]);

      if (
        evaluate(valores[0] + operador + valores[1]).toLocaleString("en-US")
          .length > 17
      ) {
        setInput(
          Number(input.toString().replaceAll(",", "")).toExponential(10)
        );
        return;
      }
      setInput(
        evaluate(valores[0] + operador + valores[1]).toLocaleString("en-US")
      ); //calculamos el resultado de la operacion
    }
  };

  const agregarClear = () => {
    setInput(0);
    setResultado(0);
    setOperador("");
    setValores([0, 0]);
  };

  return (
    <div className="App">
      <div className="contenedor-calculadora">
        <div className="fila">
          <Logo />
        </div>
        <Window input={input} resultado={resultado} />
        <div className="fila">
          <Boton manejarClic={agregarOperador}>&#9003;</Boton>
        </div>
        <div className="fila">
          <Boton manejarClic={agregarOperador}>X²</Boton>
          <Boton manejarClic={agregarOperador}>%</Boton>
          <Boton manejarClic={agregarClear}>AC</Boton>
          <Boton manejarClic={agregarOperador}>+</Boton>
        </div>
        <div className="fila">
          <Boton manejarClic={agregarInput}>7</Boton>
          <Boton manejarClic={agregarInput}>8</Boton>
          <Boton manejarClic={agregarInput}>9</Boton>
          <Boton manejarClic={agregarOperador}>-</Boton>
        </div>
        <div className="fila">
          <Boton manejarClic={agregarInput}>4</Boton>
          <Boton manejarClic={agregarInput}>5</Boton>
          <Boton manejarClic={agregarInput}>6</Boton>
          <Boton manejarClic={agregarOperador}>*</Boton>
        </div>
        <div className="fila">
          <Boton manejarClic={agregarInput}>1</Boton>
          <Boton manejarClic={agregarInput}>2</Boton>
          <Boton manejarClic={agregarInput}>3</Boton>
          <Boton manejarClic={agregarOperador}>/</Boton>
        </div>
        <div className="fila">
          <Boton manejarClic={agregarOperador}>±</Boton>
          <Boton manejarClic={agregarInput}>0</Boton>
          <Boton manejarClic={agregarInput}>.</Boton>
          <Boton manejarClic={calcularResultado}>=</Boton>
        </div>
      </div>
    </div>
  );
}

export default App;
