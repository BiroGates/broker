CREATE TABLE buy_history (
    id              VARCHAR(200) PRIMARY KEY,
    buyPrice        float,
    stockId         VARCHAR(200),
    walletId        VARCHAR(200),
    FOREIGN KEY (stockId) REFERENCES stock(id),
    FOREIGN KEY (walletId) REFERENCES wallet(id)
); 

CREATE TABLE stock (
    id              VARCHAR(200) PRIMARY KEY,
    name            VARCHAR(200),
    currentPrice    float,
    maxPriceDay     int,
    minPriceDay     int,
    beingAffected   tinyint,
    affectedStage   int NULL,
    startBeingAffectedAt datetime NULL,
    lastUpdate datetime
); 


CREATE TABLE news_affected (
    id                      VARCHAR(200) PRIMARY KEY,
    durationTimeInSeconds   INT, 
    affectedFactorNumber    INT,
    stage                   INT,
    stockId					VARCHAR(200),
    FOREIGN KEY (stockId) REFERENCES stock(id)    
);

CREATE TABLE stock_price_history (
    id      VARCHAR(200) PRIMARY KEY,
    price   float(15, 2),
    at      datetime,
    stockId	VARCHAR(200),
    FOREIGN KEY (stockId) REFERENCES stock(id)
);
