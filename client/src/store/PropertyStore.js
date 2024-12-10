import { makeAutoObservable } from "mobx";
import { getPropertyTypes } from '../http/propertyApi'
import { getPropertyPaymentTerms } from '../http/propertyApi'
import { getProperties } from '../http/propertyApi'

export default class PropertyStore {
    constructor() {
        this._propertyTypes = [];
        this._paymentTerms = [];
        this._properties = [];
        this._totalPages = 0;
        this._currentPage = 1;
        this._pageSize = 9;
        this._costMin = 0;
        this._costMax = 100000;
        this._getAllData()

        this._selectedPaymentTerm = {};
        this._selectedType = {};
        makeAutoObservable(this);
    }

    setCostMin(costMin) {
        this._costMin = costMin;
    }

    setCostMax(costMax) {
        this._costMax = costMax;
    }

    setPaymentTerms(paymentTerms) {
        this._paymentTerms = paymentTerms;
    }

    setPropertyTypes(propertyTypes) {
        this._propertyTypes = propertyTypes;
    }

    setProperties(properties) {
        this._properties = properties;
    }

    setSelectedPaymentTerm(paymentTerm) {
        this._selectedPaymentTerm = paymentTerm;
    }

    setSelectedType(type) {
        this._selectedType = type;
    }

    setCurrentPage(currentPage) {
        this._currentPage = currentPage;
    }

    setSearchWord(searchWord) {
        this._searchWord = searchWord;
        this.refreshPropertyData();
    }

    get searchWord() {
        return this._searchWord;
    }

    get currentPage() {
        return this._currentPage;
    }

    get totalPages() {
        return this._totalPages;
    }

    get selectedPaymentTerm() {
        return this._selectedPaymentTerm;
    }

    get selectedType() {
        return this._selectedType;
    }

    get paymentTerms() {
        return this._paymentTerms;
    }

    get propertyTypes() {
        return this._propertyTypes;
    }

    get properties() {
        return this._properties;
    }

    refreshPropertyData() {
        this._getAllData();
    }

    _getAllData() {
        console.log("Getting all data");
        let promises = [];
        promises.push(getPropertyTypes());
        promises.push(getPropertyPaymentTerms());
        promises.push(
            getProperties(
                this._selectedType,
                this._selectedPaymentTerm,
                this._currentPage,
                this._pageSize,
                this._costMin,
                this._costMax,
                this._searchWord,
                this._userId // Передаем userId
            )
        );
        Promise.all(promises).then((data) => {
            this._propertyTypes = data[0];
            this._paymentTerms = data[1];

            // Сортируем по приоритету на клиенте
            this._properties = data[2].sort((a, b) => b.priority - a.priority);

            this._totalPages = Math.ceil(data[2].length / this._pageSize);
        }).catch((e) => {
            console.error(e);
        });
    }

}