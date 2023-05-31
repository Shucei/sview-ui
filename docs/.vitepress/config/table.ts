export default (md: any): void => {
  md.renderer.rules.table_open = (): string =>
    '<div class="vp-table__container"><table>'
  md.renderer.rules.table_close = (): string => '</table></div>'
}
