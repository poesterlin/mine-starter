import { env } from "$env/dynamic/private";
import { error, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { setTimeout } from "timers/promises";

export const load: PageServerLoad = async () => {
    return { servers: getServers() };
};


export const actions: Actions = {
    startServer: async ({ request }) => {
        const form = await request.formData();
        const serverId = form.get('serverId');
        if (!serverId || typeof serverId !== 'string') {
            error(400, 'No serverId provided');
        }

        await updateServer(serverId, 'start');
        await setTimeout(4000);
    },

    stopServer: async ({ request }) => {
        const form = await request.formData();
        const serverId = form.get('serverId');
        if (!serverId || typeof serverId !== 'string') {
            error(400, 'No serverId provided');
        }

        await updateServer(serverId, 'stop');
        await setTimeout(4000);
    }

};

async function getServers() {
    const response = await fetch(`${env.CRAFTY_URL}/api/v2/servers/status`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${env.CRAFTY_TOKEN}`
        }
    });

    if (!response.ok) {
        console.log(await response.text());
        error(500, 'Could not get servers');
    }

    const { data } = await response.json();
    return data as Server[];
}

interface Server {
    id: number;
    world_name: string;
    running: boolean;
    online: number;
    max: number;
    version: string;
    desc: string;
    icon: string;
}

async function updateServer(serverId: string, action: 'start' | 'stop') {
    const response = await fetch(`${env.CRAFTY_URL}/api/v2/servers/${serverId}/action/${action}_server`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${env.CRAFTY_TOKEN}`
        },
    });

    if (!response.ok) {
        console.log(await response.text());
        error(500, 'Could not start server');
    }
}