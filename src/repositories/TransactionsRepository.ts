import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initialValue = { income: 0, outcome: 0 };

    const balance = this.transactions.reduce<Omit<Balance, 'total'>>(
      (acc, cur) => {
        acc[cur.type] += cur.value;
        return acc;
      },
      initialValue,
    );

    return {
      income: balance.income,
      outcome: balance.outcome,
      total: balance.income - balance.outcome,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
