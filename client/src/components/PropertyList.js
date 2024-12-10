import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import PropertyItem from "./PropertyItem";
import './PropertyList.css'

const PropertyList = observer(() => {
    const { property } = useContext(Context);

    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        property.setCurrentPage(currentPage);
        property.refreshPropertyData();
    }, [currentPage]);

    return (
        <Row className="d-flex mt-3 items-section" >

            {property.properties.length === 0 &&
                <h3 style={{ marginTop: "200px", textAlign: "center", color: "grey" }}>Ничего не найдено</h3>
            }
            {property.properties.map(property =>
                <PropertyItem key={property.id} property={property} />
            )}

            {property.totalPages > 1 &&
                <div className="pagination d-flex justify-content-between mx-2">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="pagination__button">Previous</button>
                    <div className="pagination__info" style={{ fontWeight: "bold" }}>
                        <span className="pagination__info--current">{currentPage}</span>
                        <span className="pagination__info--total">/{property.totalPages}</span>
                    </div>
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === property.totalPages} className="pagination__button">Next</button>
                </div>
            }
            <div style={{ marginTop: "20px" }}></div>

        </Row>
    );
});

export default PropertyList;