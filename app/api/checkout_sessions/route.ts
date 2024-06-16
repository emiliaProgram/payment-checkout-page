import { NextRequest, NextResponse } from 'next/server';
import stripe from '../../../lib/stripe';

export async function POST(req: NextRequest) {
    try {
        const { items } = await req.json();
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items,
            mode: 'payment',
            success_url: `${req.nextUrl.origin}/success`,
            cancel_url: `${req.nextUrl.origin}/cancel`,
        });
        return NextResponse.json({ id: session.id });
    } catch (err) {
        const error = err as Error;
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
