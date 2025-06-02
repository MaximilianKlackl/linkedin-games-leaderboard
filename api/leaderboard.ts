import { createClient } from '@supabase/supabase-js';

type Game = 'tango' | 'queens' | 'zip';

interface Result {
    user: string,
    day: Date,
    time: number,
    game: Game
}

export async function GET(request: Request) {
    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
    );

    const {data, error} = await supabase.from('result').select('*');

    return new Response(data === null ? '0' : String(data.length));
}

export function POST(request: Request) {
    return new Response('Hello From the Serverless Function');
}