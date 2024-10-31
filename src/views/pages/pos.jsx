
import Menu from "../components/modules/menu.jsx";
import RightPannel from "../components/modules/rightPannel.jsx";
import Accounting from "../components/modules/accounting.jsx";

export default function PosView({
  order,
  setOrder,
  target,
  setTarget,
  isProcessing,
  setIsProcessing,
  payment,
  setPayment,
  persons,
  setPersons,
  tableNum,
  setTableNum,
  setSubmitId,
  isEatIn,
  setIsEatIn
}) {
  return (
    <div className="App">
      <div className="right">
        <div className="menu">
          <LeftPannel
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            setTarget={setTarget}
            order={order}
            setOrder={setOrder}
            payment={payment}
            setPayment={setPayment}
            persons={persons}
            tableNum={tableNum}
            setTableNum={setTableNum}
            setSubmitId={setSubmitId}
            isEatIn={isEatIn}
          />
        </div>
      </div>

      <div className="left">
        <div className="left-content">
          <RightPannel
            order={order}
            setOrder={setOrder}
            target={target}
            setTarget={setTarget}
            setIsProcessing={setIsProcessing}
            isProcessing={isProcessing}
            persons={persons}
            setPersons={setPersons}
            isEatIn={isEatIn}
            setIsEatIn={setIsEatIn}
          />
        </div>
      </div>
    </div>
  );
}

function LeftPannel({
  isProcessing,
  setIsProcessing,
  setTarget,
  payment,
  setPayment,
  order,
  persons,
  tableNum,
  setTableNum,
  setSubmitId,
  isEatIn,
}) {
  if (!isProcessing) {
    return <Menu isEatIn={isEatIn} setTarget={setTarget} />;
  }
  return (
    <Accounting
      setIsProcessing={setIsProcessing}
      payment={payment}
      setPayment={setPayment}
      order={order}
      persons={persons}
      tableNum={tableNum}
      setTableNum={setTableNum}
      setSubmitId={setSubmitId}
      isEatIn={isEatIn}
    />
  );
}
