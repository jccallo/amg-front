<template>
    <b-navbar toggleable="lg" type="light" variant="light">
        <b-container>
            <b-navbar-brand href="#">AMG</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/">Clients</b-nav-item>
                    <b-nav-item to="/transactions">Transactions</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-avatar src="https://avatars.githubusercontent.com/u/87969707?v=4" size="30"
                        class="mt-1"></b-avatar>
                    <b-nav-item-dropdown text="Jorge CCallo" right>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>