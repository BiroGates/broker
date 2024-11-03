-- `student` initial insert
INSERT INTO student(id) VALUES ('e1b818dc-99f5-11ef-8c41-0a0027000010');


-- stock initial insert
INSERT INTO stock(id, name, currentPrice, maxPriceDay, minPriceDay,beingAffected, affectedStage, startBeingAffectedAt, lastUpdate) VALUES ('c8fb7775-12d0-422a-a658-cd495b3a0d87', 'sexo 1', 393.428, NULL, NULL, NULL, NULL, NULL);


-- wallet initial inser
INSERT INTO wallet (id, studentId, totalMoneyAmount) values ('75fcff63-99f7-11ef-8c41-0a0027000010', 'e1b818dc-99f5-11ef-8c41-0a0027000010', 100);