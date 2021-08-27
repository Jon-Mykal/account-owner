<template>
    <tr>
        <td>{{ owner.name }}</td>
        <td>{{ owner.address }}</td>
        <td>{{ owner.dateOfBirth }}</td>
        <td>
            <Button label="Details" class="p-button"/>
        </td>
        <td>
            <Button label="Edit" class="p-button" />
        </td>
        <td>
            <Button label="Remove"  class="p-button"/>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        owner: {
            required: true,
            type: Object
        }
    },
    name: "OwnerRow",
    setup () {
        

    }
}
</script>

<style scoped>

</style>