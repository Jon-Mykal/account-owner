<template>
    <div>
        <Card>
            <template #title>
                {{owner.name}}
            </template>
            <template #content>
                <p>{{owner.address}}</p>
                <p>{{owner.dateOfBirth}}</p>
            </template>
            <template #footer>
                <Button label="Details" class="p-button-info p-button-rounded"/>
                <Button label="Edit" class="p-button-rounded" />
                <Button label="Remove" class="p-button-danger p-button-rounded"/>
            </template>
        </Card>
    </div>
</template>

<script>
export default {
    name: 'OwnerCard',
    props: {
        owner: {
            required: true,
            type: Object
        }
    },
    components: {

    },
    setup() {

    }
}
</script>

<style  scoped>

</style>