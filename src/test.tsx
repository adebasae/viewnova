// import React, { useState, useEffect } from 'react';

// const Hijo: React.FC<Props> = ({ hijo }) => {
//   console.log('hijo', hijo.id);
//   const [valores, setValores] = useState<any>();
//   console.log('valores', valores);

//   const btnclick = () => {
//     setValores({ id: 1, valor: [11, 22, 33] });
//   };

//   useEffect(() => {
//     setValores(hijo);
//   }, [hijo]);

//   const tabla =
//     valores === undefined
//       ? null
//       : valores.valor.map((val: any) => {
//           return (
//             <>
//               <p>{val}</p>
//             </>
//           );
//         });

//   return (
//     <>
//       <button onClick={() => btnclick()} type="button">
//         cambiar lista
//       </button>
//       {console.log('hijo.id', hijo.id)}
//       {tabla}
//     </>
//   );
// };

// const Padre = () => {
//   const listPadre = [
//     { id: 1, valor: [1, 2, 3] },
//     { id: 2, valor: [4, 5, 6] },
//     { id: 3, valor: [7, 8, 9] },
//     { id: 4, valor: [1, 2, 3] },
//   ];

//   const l = listPadre.map((hijo: any) => {
//     return <Hijo hijo={hijo} />;
//   });

//   return <>{l}</>;
// };

// const App = () => {
//   return <Padre />;
// };

// type Props = {
//   hijo: any;
// };

// export default App;

import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';

const ChildOne = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);

  useImperativeHandle(ref, () => ({
    count,
  }));

  const updateCount = () => {
    setCount((c) => c + 1);
    console.log(count + 1);
  };

  return (
    <button type="button" onClick={updateCount}>
      Increment
    </button>
  );
});

const ChildTwo = forwardRef((props, ref: any) => {
  const [t, setT] = useState(false);
  const checkCount = () => {
    console.log('->a', ref.current.count);
    setT(!t);
  };

  console.log('-dasd>', ref.current);
  return (
    <>
      <p> {ref.current === undefined ? null : ref.current.count}</p>
      <button type="button" onClick={checkCount}>
        Count
      </button>
    </>
  );
});

const Parent = () => {
  const ref = useRef();

  return (
    <div>
      <ChildOne ref={ref} />
      <ChildTwo ref={ref} />
    </div>
  );
};

export default Parent;
