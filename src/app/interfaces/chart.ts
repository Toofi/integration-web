export interface Chart {
    labels: Array<string>,
    datasets: Array<Dataset>
};

export interface Dataset {
    label: string,
    data: Array<number>
};