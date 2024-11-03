import { terminal as term } from 'terminal-kit'
import pool from '../database/pool';



async function cleanScreen() {
    term.clear();
    const [rows]: any[] = await pool.query('SELECT * FROM wallet WHERE id = ?', ['75fcff63-99f7-11ef-8c41-0a0027000010']);
    const walletInfo = rows[0];

    const [wallet_stock_info]: any[] = await pool.query('SELECT * FROM wallet_stock WHERE walletId = ?', ['75fcff63-99f7-11ef-8c41-0a0027000010']);
    

    const [availableStock]: any[] = await pool.query('SELECT * FROM stock');


    term.moveTo(1, 1); // Move o cursor para o início da tela
    term.brightCyan('!!! USING WALLET ID `75fcff63-99f7-11ef-8c41-0a0027000010`\n');
    term.brightCyan('=============wallet_info============\n');
    term.brightWhite('totalAmount: ');
    term.green(`${walletInfo?.totalMoneyAmount}\n`);
    console.log();
    console.log();
    term.brightCyan('=============wallet_stock_info============\n');

    for(let i = 0; i < wallet_stock_info.length; i++) {
        term.brightWhite('stockId: ');
        term.green(`${wallet_stock_info[i]?.stockId}\n`);
        term.brightWhite('stockAmount: ');
        term.green(`${wallet_stock_info[i]?.stockAmount}\n`);
        term.brightWhite('moneyAmount: ');
        term.green(`${wallet_stock_info[i]?.moneyAmount}\n`);
        term.brightWhite('---------------------------------------\n')
    }
    console.log();
    console.log();
    term.brightCyan('=============stocks_available============\n');
    for (let i = 0; i < availableStock.length; i++) {
        term.brightWhite('stockId: ');
        term.green(`${availableStock[i]?.id}\n`);
        term.brightWhite('stockName: ');
        term.green(`${availableStock[i]?.name}\n`);
        term.brightWhite('stockCurrentPrice: ');
        term.green(`${availableStock[i]?.currentPrice}\n`);
        term.brightWhite('beingAffected: ');
        term.green(`${availableStock[i]?.beingAffected}\n`);
        term.brightWhite('affectedStage: ');
        term.green(`${availableStock[i]?.affectedStage}\n`);
        term.brightWhite('---------------------------------------\n')
    }
    
}

setInterval(() => {
    cleanScreen();
}, 2000);



