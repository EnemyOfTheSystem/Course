import React, { useContext } from "react";
import Select from "react-dropdown-select";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";

const PaymentTermBar = observer(() => {
    const { property } = useContext(Context);
    const options = property.paymentTerms.map(paymentTerm => ({
        label: paymentTerm.name,
        value: paymentTerm.id
    }));

    return (
        <Row className="d-flex mt-3" style={{ width: "100%" }}>
            <div style={{ fontWeight: 'bold', fontSize: '16px', marginRight: '10px', textAlign: "center" }}>Тип оплаты</div>
            <Select
                options={options}
                value={options.filter(option => option.value === property.selectedPaymentTerm.id)}
                onChange={e => property.setSelectedPaymentTerm(e[0].value)}
            />
        </Row>
    );
});

export default PaymentTermBar;