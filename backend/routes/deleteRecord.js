const express= require("express");
const User=require('../Schema/user_details');
const router = express.Router();



router.delete('/deleterecord/:id', async (req,res)=>{
   
    try {
        
        let users= await User.findOneAndDelete({ _id: req.params.id });
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ msg: 'User deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");
    }
})

/**
 * @swagger
 * /api/deleterecord/{id}:
 *   delete:
 *     summary: Delete a user record by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user record to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               msg: "User deleted successfully"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               msg: "User not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: "Some error found"
 */
module.exports = router;