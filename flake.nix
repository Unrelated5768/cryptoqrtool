{
  description = "Bun-first Svelte 5 application development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    { nixpkgs, ... }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];

      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      devShells = forAllSystems (
        system:
        let
          pkgs = import nixpkgs { inherit system; };
          inherit (pkgs) lib;
          playwrightPackages = lib.optionals pkgs.stdenv.isLinux [
            pkgs.playwright-driver.browsers
          ];
          playwrightShellHook = lib.optionalString pkgs.stdenv.isLinux ''
            export PLAYWRIGHT_BROWSERS_PATH="${pkgs.playwright-driver.browsers}"
            export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
          '';
        in
        {
          default = pkgs.mkShell {
            packages =
              (with pkgs; [
                ansible
                ansible-lint
                bun
                git
                nodejs_22
                prettier
                typescript
                typescript-language-server
              ])
              ++ playwrightPackages;

            SVELTEKIT_TELEMETRY_DISABLED = "1";

            shellHook = ''
              export BUN_INSTALL="$PWD/.bun"
              export PATH="$BUN_INSTALL/bin:$PATH"
            ''
            + playwrightShellHook
            + ''

              echo "Bun $(bun --version) | Node $(node --version)"
              echo "Playwright browsers: ''${PLAYWRIGHT_BROWSERS_PATH:-managed by npm}"
              echo "Create app: bun create svelte@latest ."
              echo "Install deps: bun install"
              echo "Run dev:    bun run dev -- --host 0.0.0.0"
              echo "Run e2e:    bun run test:e2e:smoke"
            '';
          };
        }
      );

      formatter = forAllSystems (
        system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        pkgs.nixfmt-rfc-style
      );
    };
}
