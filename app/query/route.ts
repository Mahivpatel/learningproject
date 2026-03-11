import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

export async function GET() {
  try {
    const invoices = await listInvoices();
    
    // Use Response.json() and ensure data is treated as an array
    return Response.json(invoices);
  } catch (error) {
    console.error('Database Error:', error);
    return Response.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}