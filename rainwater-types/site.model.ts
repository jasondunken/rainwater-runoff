export type SiteObj = {
    id: number;
    site: SiteInformation | undefined;
    features: string[] | undefined;
    rows: string[][] | undefined;
};

export type SiteInformation = {
    SiteCode: string;
    SiteName: string;
    SiteDescription: Description;
    VariableInfo: VariableInformation[];
    source: SourceInfo;
};

export type Description = {
    Latitude: number;
    Longitude: number;
    Elevation: number;
    VerticalDatum: string;
    SiteType: string;
    SiteNotes: string;
};

export type VariableInformation = {
    VariableCode: string;
    VariableName: string;
    ValueType: string;
    DataType: string;
    GeneralCategory: string;
    SampleMedium: string;
    VariableUnitName: string;
    VariableUnitType: string;
    VariableUnitAbbr: string;
    NoDataValue: number;
    TimeSupport: string;
    TimeSuppUnitAbbr: string;
    TimeSupportUnitName: string;
    TimeSupportUnitType: string;
    MethodDesctiption: string;
    MethodLink: string;
    VerticalOffset: number;
    SensorNotes: string;
};

export type SourceInfo = {
    Organization: string;
    SourceLink: string;
    Citation: string;
};

export type MapLocation = {
    siteId: string;
    sondeId: string;
    lat: number;
    lng: number;
};

export type DataRow = {
    id: string;
    data: string[];
    invalidValueIndices?: number[];
};
