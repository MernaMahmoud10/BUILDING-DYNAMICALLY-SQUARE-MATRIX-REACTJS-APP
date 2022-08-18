import React, { useEffect, useState } from 'react'

export default function Home() {
  const [Num, setNum] = useState(3);
  let sqrNum = Math.pow(Num, 2);
  const [Matrix, setMatrix] = useState([]);
  const [A, setA] = useState([]);
  const [firstValue, setfirstValue] = useState("")
  const [secondValue, setsecondValue] = useState("")
  const [firstID, setfirstID] = useState("")
  const [secondID, setsecondID] = useState("")
  const [firstParentID, setfirstParentID] = useState("")
  const [secondParentID, setsecondParentID] = useState("")
  const [count, setcount] = useState(2);

  useEffect(() => {

    if (count === 0) {
      let myMatrix = [...Matrix];
      myMatrix[firstParentID][firstID] = secondValue;
      myMatrix[secondParentID][secondID] = firstValue;
      setMatrix(myMatrix);
      setcount(2)
    }
  }, [count]);


  function getValue(e) {
    if (count === 2) {
      setcount(1)
      setfirstID(e.target.id);
      setfirstValue(e.target.innerHTML);
      setfirstParentID(e.target.parentElement.parentElement.id);
      e.target.classList.add("btn", "btn-info")


    }
    else {
      setcount(0);
      setsecondID(e.target.id);
      setsecondValue(e.target.innerHTML);
      setsecondParentID(e.target.parentElement.parentElement.id);
      e.target.classList.add("btn", "btn-info")

    }

  }


  useEffect(() => {
    makeArray();
  }, [Num])


  useEffect(() => {
    if (Num === 0)
      return;

    create2Darray(A);

  }, [A])
  function getNum(e) {
    setNum(e.target.value);

  }


  function makeArray() {
    let myNumArray = []
    for (let i = 1; i <= sqrNum; i++) {
      myNumArray.push(i);

    }
    setA(myNumArray);
  }

  function create2Darray(A) {
    var arr = [];
    var rows = Math.sqrt(A.length);
    for (var i = 0; i < rows; i++) {
      arr[i] = [];
      for (var j = 0; j < rows; j++) {
        arr[i][j] = A[i * rows + j];
      }
    }
    setMatrix(arr);

  }


  return (
    <>

      <div className='py-5 d-flex w-100 flex-column align-items-center justify-content-center'>
        <h1 className='py-5 text-info'>building square matrix dimensions of the input number</h1>
        <input placeholder='enter any number to build square matrix with dimensions of this number'
          onChange={getNum}
          className='form-control d-block'
          defaultValue={Num}
          type="number"></input>
        {Matrix ? Matrix.map((row, index) => <div key={index} id={index} className='row w-100 my-5'>
          {row.map((number, index) =>
            <div className={`col`} key={index}>
              <button onClick={getValue} id={index} className='px-4 py-2 font-weight-bold'>{number}</button>
            </div>)}
        </div>) : ""}
      </div>

    </>
  )
}
