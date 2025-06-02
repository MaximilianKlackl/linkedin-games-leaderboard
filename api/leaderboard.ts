import { createClient } from '@supabase/supabase-js';

type Game = 'tango' | 'queens' | 'zip';

interface Result {
    user: string,
    time: number,
    day: Date,
    game: Game
}

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
    const now = new Date();

    // Get today's 9 PM
    const today9pm = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        21, 0, 0, 0
    );

    let start: Date;
    let end: Date;

    if (now < today9pm) {
    // Before 9 PM: get from yesterday 9 PM to today 9 PM
        start = new Date(today9pm.getTime() - 24 * 60 * 60 * 1000); // 9 PM yesterday
        end = today9pm;                                              // 9 PM today
    } else {
    // After 9 PM: get from today 9 PM to tomorrow 9 PM
        start = today9pm;                                            // 9 PM today
        end = new Date(today9pm.getTime() + 24 * 60 * 60 * 1000);    // 9 PM tomorrow
    }

    const from = start.toISOString();
    const to = end.toISOString();

    const { data, error } = await supabase
        .from('result')
        .select('*')
        .gte('day', from)
        .lt('day', to);

    const result: Result[] = data === null ? [] : data;

    const filtered: Record<Game, Result[]> = {
        'queens': result.filter(r => r.game === 'queens'),
        'tango': result.filter(r => r.game === 'tango'),
        'zip': result.filter(r => r.game === 'zip'),
    }

    return new Response(JSON.stringify(filtered));
}

export async function POST(request: Request) {
    const data = await request.json() as Result;

    const { error } = await supabase.from('result').insert({... data})

    if (error !== null) {
        return new Response("Error", {status: 500});
    }

    return new Response(JSON.stringify(data));
}