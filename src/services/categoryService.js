import { supabase } from "./supabaseClient";


const CategoryService = {
    async getByType(type) {
        const { data, error } = await supabase
            .from('category')
            .select('*')
            // .eq('type', type)
            .or(`type.eq.${type},type.is.null`)
            .order('id', { ascending: false });
        
        if (error) throw error;
        return data;
    }
}

export default CategoryService;