import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

// Define transaction type for better type safety
interface Transaction {
  _id?: any;
  type: 'investment' | 'profit';
  amount: number;
  category: string;
  description?: string;
  createdAt?: Date;
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    // Get all transactions and calculate totals
    const transactions = await db.collection('transactions').find({}).toArray() as Transaction[];

    const totalInvestment = transactions
      .filter(t => t.type === 'investment')
      .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

    const totalProfit = transactions
      .filter(t => t.type === 'profit')
      .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

    return NextResponse.json({
      transactions,
      totals: {
        totalInvestment,
        totalProfit,
        netProfit: totalProfit - totalInvestment
      }
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, amount, category, description } = await request.json();

    if (!type || !amount || !category) {
      return NextResponse.json(
        { error: 'Type, amount, and category are required' },
        { status: 400 }
      );
    }

    if (type !== 'investment' && type !== 'profit') {
      return NextResponse.json(
        { error: 'Type must be either "investment" or "profit"' },
        { status: 400 }
      );
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be a positive number' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const transaction = {
      type,
      amount,
      category,
      description: description || '',
      createdAt: new Date(),
    };

    const result = await db.collection('transactions').insertOne(transaction);

    return NextResponse.json({
      success: true,
      transaction: { ...transaction, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}
