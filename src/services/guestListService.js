import { supabase } from "./supabaseClient";


const GuestListService = {
    async searchGuests(req) {
        const { data, error } = await supabase.rpc('search_guests_2',
            {
                p_name: req.name,
                p_relationship: req.relationship,
                p_is_invite: req.isInvite,
                p_page_index: req.pageIndex,
                p_page_size: req.pageSize
            }
        );
        
        if (error) throw error;
        return data;
    },

    async guestOverview() {
        const { data, error } = await supabase.rpc('guest_overview');
        
        if (error) throw error;
        return data;
    },

    async getById(id) {
        const { data, error } = await supabase
            .from('guest')
            .select('*')
            .eq('id', id);
        
        if (error) throw error;
        return data.length > 0 ? data[0] : null;
    },

    async insertGuest(req) {
        const { data, error } = await supabase
            .from('guest')
            .insert([req]);
        
        if (error) throw error;
    },

    async updateGuest(guestId, req) {
        const { data, error } = await supabase
            .from('guest')
            .update([req])
            .eq('id', guestId)
            .select();
        
        if (error) throw error;
    },

    async updateInvited(guestId, isInvited) {
        const { data, error } = await supabase
            .from('guest')
            .update({ is_invite: isInvited })
            .eq('id', guestId)
            .select();
        
        if (error) throw error;
    },

}

export default GuestListService;