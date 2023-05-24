const userModels = require('../models/user');


const getAllUser = async (req, res) => {
    try {
        const [data] = await userModels.getAllUsers();
        // console.log("test" , data);
        res.json({
            message: 'GET All users Success',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch users',
            error: error.message
        });
    }
}

const createNewUser = async (req, res) => {
    // Menampilkan request berdasarkan body
    console.log(req.body);
    //jika descstuturing
    //const { body } = req;
    const {email,password} = req.body;
    try {
        const userExists = await userModels.findByEmail(email);
        if (userExists) {
        return res.status(409).json({ error: 'User already exists' });
        }
        const user = await userModels.createNewUsers(email,password);
        res.status(201).json({
            message: 'Create New users Success',
            // Mengirimkan data dummy berdasarkan request body
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch users',
            error: error.message
        });
    }
}

const updateUser = async (req, res) => {
    // Desctructuring
    const { id } = req.params;
    const { body } = req;
    try {
        await userModels.updateUsers(body, id);
        res.json({
            message: 'Update User Success',
            data:{
                id: id,
                ...body //spread operator
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
        
    }
}

const deleteUser = async (req, res) => {
    // Desctructuring
    const { id } = req.params;
    try {
        await userModels.deleteUsers(id);
        res.json({
            message: 'Delete User Success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
}

module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser
};
